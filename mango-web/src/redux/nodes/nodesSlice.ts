// redux/nodes/nodesSlice.ts
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BreadcrumbItem, NodeDto } from "@/types/node.types";
import { listNodes, getNodeBreadcrumb, starredList, listTrash } from "@/api/nodes.api";
import type { RootState } from "../store";

interface NodesState {
    currentFolderId: string | null;
    items: NodeDto[];
    breadcrumb: BreadcrumbItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    trashItems: NodeDto[];
    selectedId: string | null;
}

const initialState: NodesState = {
    currentFolderId: null,
    items: [],
    breadcrumb: [],
    status: "idle",
    error: null,
    trashItems: [],
    selectedId: null
};

// -------------------------------------------------------------------------
// Thunk: intră într-un folder (sau în rădăcină, dacă folderId e null)
// -------------------------------------------------------------------------
export const fetchFolder = createAsyncThunk(
    "nodes/fetchFolder",
    async (folderId: string | null) => {
        const [items, breadcrumb] = await Promise.all([
            listNodes(folderId),
            folderId ? getNodeBreadcrumb(folderId) : Promise.resolve([]),
        ]);

        return { folderId, items, breadcrumb };
    },
);

export const fetchTrash = createAsyncThunk(
    "nodes/fetchTrash",
    async () => {
        return await listTrash();
    }
);

export const fetchStarred = createAsyncThunk(
    "nodes/fetchStarred",
    async () => {
        return await starredList();
    }
);

const nodesSlice = createSlice({
    name: "nodes",
    initialState,
    reducers: {
        selectNode: (state, action: PayloadAction<string>) => {
            state.selectedId = state.selectedId === action.payload ? null : action.payload;
        },
        clearSelection: (state) => {
            state.selectedId = null;
        },
        markAsTrashedLocally: (state, action: PayloadAction<string>) => {
            const nodeId = action.payload;
            const itemToTrash = state.items.find((item) => item.id === nodeId);

            if (itemToTrash) {
                state.items = state.items.filter((item) => item.id !== nodeId);
                state.trashItems.unshift({ ...itemToTrash, trashedAt: new Date().toISOString() }); // Adaugă la începutul listei de trash
            }
        },

        restoreFromTrashLocally: (state, action: PayloadAction<string>) => {
            const nodeId = action.payload;
            state.trashItems = state.trashItems.filter((item) => item.id !== nodeId);
        },

        removeItemPermanentlyLocally: (state, action: PayloadAction<string>) => {
            const nodeId = action.payload;
            state.trashItems = state.trashItems.filter((item) => item.id !== nodeId);
            state.items = state.items.filter((item) => item.id !== nodeId);
        },
        emptyTrashLocally: (state) => {
            state.trashItems = [];
        },


        removeItemLocally: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            if (state.selectedId === action.payload) {
                state.selectedId = null;
            }
        },

        addItemLocally: (state, action: PayloadAction<NodeDto>) => {
            state.items.push(action.payload);
        },

        updateItemLocally: (state, action: PayloadAction<NodeDto>) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        resetNodesState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFolder.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchFolder.fulfilled, (state, action) => {
                state.currentFolderId = action.payload.folderId;
                state.items = action.payload.items;
                state.breadcrumb = action.payload.breadcrumb;
                state.status = "succeeded";
                state.selectedId = null
            })
            .addCase(fetchFolder.rejected, (state) => {
                state.status = "failed";
                state.error = "Failed to fetch folder data.";
            })
            .addCase(fetchTrash.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchTrash.fulfilled, (state, action) => {
                state.trashItems = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchTrash.rejected, (state) => {
                state.status = "failed";
                state.error = "Failed to fetch trash data.";
            })

    },
});

export const {
    removeItemLocally,
    addItemLocally,
    updateItemLocally,
    resetNodesState,
    markAsTrashedLocally,
    restoreFromTrashLocally,
    removeItemPermanentlyLocally,
    emptyTrashLocally,
    selectNode,
    clearSelection
} = nodesSlice.actions;

export const selectCurrentItems = (state: RootState) => state.nodes.items;
export const selectTrashItems = (state: RootState) => state.nodes.trashItems;
export const selectCurrentFolderId = (state: RootState) => state.nodes.currentFolderId;
export const selectBreadcrumb = (state: RootState) => state.nodes.breadcrumb;
export const selectNodesStatus = (state: RootState) => state.nodes.status;
export const selectNodesError = (state: RootState) => state.nodes.error;
export const selectSelectedId = (state: RootState) => state.nodes.selectedId;
export const selectSelectedNode = createSelector(
    [selectCurrentItems, selectTrashItems, selectSelectedId],
    (items, trashItems, selectedId) => {
        if (!selectedId) return null;
        return (
            items.find((item) => item.id === selectedId) ??
            trashItems.find((item) => item.id === selectedId) ??
            null
        );
    }
);
export default nodesSlice.reducer;