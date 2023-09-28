import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
  className: string;
}

function Modal({ isOpen, onChange, children, className }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
}

export default Modal;
