import { mockProjects } from "@/constants/mock-data";
import { Card, Project } from "@/types/common";
import { generatePlaceholderCard } from "@/utils/formatters";
import { mapOrder } from "@/utils/sort";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";

// ---- STATE INTERFACE ----
interface ActiveProjectState {
  activeProject: Project | null;
  loading: boolean;
  error?: string;
}

const initialState: ActiveProjectState = {
  activeProject: null,
  loading: false,
  error: undefined,
};

// ---- ASYNC THUNK ----
export const fetchProjectDetail = createAsyncThunk<
  Project,
  string,
  { rejectValue: string }
>(
  "activeProject/fetchProjectDetail",
  async (projectId, { rejectWithValue }) => {
    try {
      // Tìm project theo id trong mock-data
      const project = mockProjects.find((p) => p.id === projectId);
      if (!project) return rejectWithValue("Không tìm thấy project");

      // Clone để xử lý sắp xếp
      const cloned = structuredClone(project);

      // Sắp xếp column theo columnOrderIds
      cloned.columns = mapOrder(cloned.columns, cloned.columnOrderIds, "id");

      // Sắp xếp card trong từng column + thêm placeholder nếu rỗng
      cloned.columns.forEach((col) => {
        if (isEmpty(col.cards)) {
          const columnForPlaceholder = {
            ...col,
            _id: col.id,
            boardId: col.projectId ?? "",
          };
          const placeholder = generatePlaceholderCard(
            columnForPlaceholder,
          ) as unknown as Card;
          col.cards = [placeholder];
          col.cardOrderIds = [placeholder.id];
        } else {
          col.cards = mapOrder(col.cards, col.cardOrderIds, "id");
        }
      });

      return cloned;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Lỗi khi fetch project");
    }
  },
);

// ---- SLICE ----
export const activeProjectSlice = createSlice({
  name: "activeProject",
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<Project>) => {
      state.activeProject = action.payload;
    },
    updateCardInProject: (state, action: PayloadAction<Card>) => {
      if (!state.activeProject) return;

      const updatedCard = action.payload;
      const column = state.activeProject.columns.find(
        (c) => c.id === updatedCard.columnId,
      );

      if (column) {
        const cardIndex = column.cards.findIndex(
          (c) => c.id === updatedCard.id,
        );
        if (cardIndex !== -1) {
          column.cards[cardIndex] = {
            ...column.cards[cardIndex],
            ...updatedCard,
          };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetail.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.activeProject = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { setActiveProject, updateCardInProject } =
  activeProjectSlice.actions;
export default activeProjectSlice.reducer;
