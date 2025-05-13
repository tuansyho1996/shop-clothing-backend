import { BadRequestError } from "../core/error.response.js";
import globalModel from "../models/global.model.js";
class GlobalService {
    getGlobal = async (nameGlobal) => {
        // Logic to get all globals
        if (nameGlobal === 'all') {
            const globals = await globalModel.find();
            if (!globals) {
                throw new BadRequestError('Error fetching globals');
            }
            return globals;
        } else {
            const global = await globalModel.findOne({ global_name: nameGlobal });
            if (!global) {
                throw new BadRequestError('Global not found');
            }
            return global;
        }
    }
    createGlobal = async (data) => {
        // Logic to create a global
        const newGlobal = await globalModel.create(data);
        if (!newGlobal) {
            throw new BadRequestError('Error creating global');
        }
        return newGlobal;
    }
    deleteGlobal = async (id) => {
        // Logic to delete a global
        const deletedGlobal = await globalModel.findByIdAndDelete(id);
        if (!deletedGlobal) {
            throw new BadRequestError('Error deleting global');
        }
        return deletedGlobal;
    }
    updateGlobal = async (id, data) => {
        // Logic to update a global
        const updatedGlobal = await globalModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedGlobal) {
            throw new BadRequestError('Error updating global');
        }
        return updatedGlobal;
    }
}
export default new GlobalService();