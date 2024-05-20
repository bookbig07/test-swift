import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableFormData } from './FormData'

interface FormState {
    TableForm: TableFormData[];
}

const initialState: FormState = {
    TableForm: [],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addFormData(state, action: PayloadAction<TableFormData>) {
            state.TableForm.push(action.payload);
            saveFormData(state.TableForm)
        },
        deleteFormData(state, action: PayloadAction<{ key: React.Key; status: string }>) {

        },
        loadFormData(state, action: PayloadAction<TableFormData[]>) {
            if (action.payload.length > 0) {
              state.TableForm = action.payload;
            }
        },
    },
});
const STORAGE_KEY = 'FORMDATALIST';

export const loadDataFromLocalStorage = () => {
    const Form = localStorage.getItem(STORAGE_KEY);
    return Form ? JSON.parse(Form) : [];
};

export const saveFormData = (Form: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Form));
};

export const { addFormData , loadFormData } = formSlice.actions;
export default formSlice.reducer;