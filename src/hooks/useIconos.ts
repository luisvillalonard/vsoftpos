import { EditOutlined, CheckOutlined, DownOutlined, UpOutlined, LockOutlined, MenuOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { IconType } from "react-icons"
import { AiOutlineUser, AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai"
import { BsSearch, BsTrash } from "react-icons/bs"
import { CiBarcode } from "react-icons/ci";
import { IoCloseOutline, IoTextOutline } from "react-icons/io5";
import { SlUserUnfollow, SlUserFollowing } from "react-icons/sl";

export function useIconos() {

    const IconArrowDown = DownOutlined;
    const IconArrowUp = UpOutlined;
    const IconAlert = BellOutlined;
    const IconBarcode: IconType = CiBarcode;
    const IconCheck = CheckOutlined;
    const IconClose = IoCloseOutline; //AiOutlineClose
    const IconEdit = EditOutlined;
    const IconLock = LockOutlined;
    const IconLogout = LogoutOutlined;
    const IconMenu = MenuOutlined; //IoMenuOutline;
    const IconSearch: IconType = BsSearch;
    const IconText: IconType = IoTextOutline;
    const IconTrash: IconType = BsTrash;
    const IconUser: IconType = AiOutlineUser;
    const IconUserAdd: IconType = AiOutlineUserAdd;
    const IconUserBad: IconType = SlUserUnfollow;
    const IconUserDelete: IconType = AiOutlineUserDelete;
    const IconUserGood: IconType = SlUserFollowing;

    return {
        IconArrowDown,
        IconArrowUp,
        IconAlert,
        IconBarcode,
        IconCheck,
        IconClose,
        IconEdit,
        IconLock,
        IconLogout,
        IconMenu,
        IconSearch,
        IconText,
        IconTrash,
        IconUser,
        IconUserAdd,
        IconUserBad,
        IconUserDelete,
        IconUserGood,
    }

}