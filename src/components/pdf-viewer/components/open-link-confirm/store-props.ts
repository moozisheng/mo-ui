import { ReactNode } from "react";

export default interface StoreProps {
    clickedTarget?: string;
    cancelText?: string;
    okText?: string;
    linksable?: boolean;
    modalTitle?: string | ReactNode;
}
