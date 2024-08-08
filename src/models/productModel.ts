import { ValidationError } from "./exceptions";
import Joi from "joi";

class ProdcutModel {
    id: number;
    name: string;
    price: number;
    description: string;

    constructor(pm: ProdcutModel){
        this.id = pm.id;
        this.name = pm.name;
        this.description = pm.description;
        this.price = pm.price;
    }

    private static validateSchema = Joi.object({
        id: Joi.number().optional().positive(),
        name: Joi.string().min(2).max(20),
        price: Joi.number().positive().max(100000),
        description: Joi.string().optional().max(200),
    })

    validate(): void {               
        const res = ProdcutModel.validateSchema.validate(this)
        if (res.error){                                                
            throw new ValidationError(res.error.details[0].message)            
        }
    }
}

export default ProdcutModel;