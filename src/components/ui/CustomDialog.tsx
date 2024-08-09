import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";


type CustomDialogProps = {
    title: string;
    triggerComponent: React.ReactNode;
    description: React.ReactNode;
};

const CustomDialog: React.FC<CustomDialogProps> = ({ title, triggerComponent, description }) => {
    return (
        <Dialog>
            <DialogTrigger>{triggerComponent}</DialogTrigger>
            <DialogContent className="w-4/5">
                <DialogHeader className="">
                    <DialogTitle className="mb-2">{title}</DialogTitle>
                    <DialogDescription asChild>{description}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;