import { Schema,model,models } from "mongoose";

const RevenueSchema = new Schema({
    month:{
        type:String,
        require:true,
    },
    revenue:{
        type:String,
        require:true
    }
  })

  const Revenue = models.Revenue || model("Revenue",RevenueSchema)

  export default Revenue