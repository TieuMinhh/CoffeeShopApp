const initState = {
  users: [
    { id: 1, name: "Phong" },
    { id: 2, name: "Thanh" },
    { id: 3, name: "HTP" },
  ],
  isDangNhap: null,
  id_category: "ALL",
  id_product: "ALL",
  id_order: "",
  arrGioHang: [],
  history: "",
  signIn: "",
  tongtien: 0,
  listCanThanhToan: [],
  tienCanThanhToan: 0,
  id_account: "",
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      console.log("user can xoa: ", action.payload);
      // let users = state.users;
      // users = users.filter(item => item.id != action.payload.id)
      // console.log('>>>Check state: ', { ...state });
      // return { ...state, users };
      break;
    // case 'ADD_USER':
    //     let id = Math.floor(Math.random() * 1001)
    //     let user = { id: id, name: `random - ${id} ` }
    //     return { ...state, users: [...state.users, user] }
    //     break;
    case "daDangNhap":
      console.log("Da dang nhap:", action.payload);
      // localStorage.setItem('dangnhap', true)
      return {
        ...state,
        isDangNhap: true,
      };
      break;
    case "dangXuat":
      // localStorage.setItem('dangnhap', false)
      // localStorage.removeItem('dangnhap')
      // localStorage.removeItem('user')
      return {
        ...state,
        isDangNhap: false,
      };
      break;
    case "id_category":
      console.log("Id category:", action.payload);
      return {
        ...state,
        id_category: action.payload,
      };
      break;
    case "id_product":
      return {
        ...state,
        id_product: action.payload,
      };
      break;
    case "id_order":
      return {
        ...state,
        id_order: action.payload,
      };
      break;
    case "arrCart":
      return {
        ...state,
        arrGioHang: action.payload,
      };
      break;
    case "history":
      return {
        ...state,
        history: action.payload,
      };
      break;
    case "signin":
      return {
        ...state,
        signIn: action.payload,
      };
      break;
    case "tongtien":
      return {
        ...state,
        tongtien: action.payload,
      };
      break;
    case "listCanThanhToan":
      return {
        ...state,
        listCanThanhToan: action.payload,
      };
      break;
    case "tienCanThanhToan":
      return {
        ...state,
        tienCanThanhToan: action.payload,
      };
      break;
    case "id_account":
      return {
        ...state,
        id_account: action.payload,
      };
      break;
    default:
      return state;
  }
};

export default rootReducer;
