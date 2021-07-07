const initialState = {
   device: null
};
export default function (state = initialState, action) {
   let { type } = action;
   if (type) {
      return state;
   }
   return state;
}
