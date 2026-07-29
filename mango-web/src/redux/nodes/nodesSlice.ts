// redux/nodes/nodesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BreadcrumbItem, NodeDto } from "@/types/node.types";
import { listNodes, getNodeBreadcrumb } from "@/api/nodes.api";

interface NodesState {
    currentFolderId: string | null;
    items: NodeDto[];
    breadcrumb: BreadcrumbItem[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: NodesState = {
    currentFolderId: null,
    items: [],
    breadcrumb: [],
    status: "idle",
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

const nodesSlice = createSlice({
    name: "nodes",
    initialState,
    reducers: {
        // scoate un element din listă local, fără refetch (ex: după ștergere/mutare)
        removeItemLocally: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        // adaugă un element nou local (ex: după upload sau creare folder reușită)
        addItemLocally: (state, action: PayloadAction<NodeDto>) => {
            state.items.push(action.payload);
        },

        // actualizează un element local (ex: după redenumire), fără refetch
        updateItemLocally: (state, action: PayloadAction<NodeDto>) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFolder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFolder.fulfilled, (state, action) => {
                state.currentFolderId = action.payload.folderId;
                state.items = action.payload.items;
                state.breadcrumb = action.payload.breadcrumb;
                state.status = "succeeded";
            })
            .addCase(fetchFolder.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { removeItemLocally, addItemLocally, updateItemLocally } = nodesSlice.actions;
export default nodesSlice.reducer;