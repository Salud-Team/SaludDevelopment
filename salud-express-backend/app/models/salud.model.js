/*
module.exports = mongoose => {

    const SaludUser = mongoose.model(
      "SaludUser",
      mongoose.Schema(
        {
          name: String,
          id: Number, 
          phone_num: Number, 
          email: String,
          password: String,
          personalUser: Boolean
        },
        { timestamps: true }
      )
    );

    const PersonalUser = mongoose.model(
        "PersonalUser",
        mongoose.Schema(
          {
            id: Number,
            name: String,
            payment_type: String
          },
          { timestamps: true }
        )
      );

    const MerchantUser = mongoose.model(
        "MerchantUser",
        mongoose.Schema(
          {
            id: Number,
            name: String,
            location: String, 
            food_type: String
          },
          { timestamps: true }
        )
      );

    const Order = mongoose.model(
        "Orders",
        mongoose.Schema(
          {
            id: Number,
            gifter_id: Number, 
            recipient_id: Number, 
            merchant_id: Number,
            amount: Number
          },
          { timestamps: true }
        )
      );
  
    return {SaludUser, PersonalUser, MerchantUser, Order};
  };

*/
  module.exports = mongoose => {
    var SaludUserSchema = mongoose.Schema(
      {
        name: String,
        id: Number, 
        phone_num: Number, 
        email: String,
        password: String,
        personalUser: Boolean
        //pictures: how to store
      },
      { timestamps: true }
    );

    var PersonalUserSchema = mongoose.Schema(
        {
          id: Number,
          name: String,
          payment_type: String
        },
        { timestamps: true }
      );

    var MerchantUserSchema = mongoose.Schema(
      {
        id: Number,
        name: String,
        location: String, 
        food_type: String
      },
      { timestamps: true }
    );

    var OrderSchema = mongoose.Schema(
      {
        id: Number,
        gifter_id: Number, 
        recipient_id: Number, 
        merchant_id: Number,
        amount: Number, 
        description: String,
        //Check if/how we store videos
        redeemed: Boolean
      },
      { timestamps: true }
    );
  
    SaludUserSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    PersonalUserSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    MerchantUserSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    OrderSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const SaludUser = mongoose.model("SaludUser", SaludUserSchema);
    const PersonalUser = mongoose.model("PersonalUser", PersonalUserSchema);
    const MerchantUser = mongoose.model("MerchantUser", MerchantUserSchema);
    const Order = mongoose.model("Order", OrderSchema);
    return {SaludUser, PersonalUser, MerchantUser, Order};
  };