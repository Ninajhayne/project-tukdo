
import { useState } from "react"
import { useModal } from "@/hooks/use-modal-store"

import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShareLinkModal() {
    const { isOpen, onClose, type, data } = useModal();
    const { apiUrl } = data;

    const isModalOpen = isOpen && type === "shareLink";

    //const [buttonText, setButtonText] = useState('Copy');

    // Assuming you have a state to track the button icon
    //const [buttonIcon, setButtonIcon] = useState(<Copy className="h-4 w-4" />);

    const [ copied, setCopied ] = useState(false);

    const handleClose = () => {
        onClose();
    }
    

    const handleCopyClick = () => {
        // Select the input text and copy it
        /*
        const input = document.getElementById("link") as HTMLInputElement;;
        if (input) {
            input.select();
            document.execCommand("copy");
        
            // Change button text and icon
            setButtonText('Check');
            setButtonIcon(<Check className="h-4 w-4" />);
        
            // Reset button text and icon after 3 seconds
            setTimeout(() => {
                setButtonText('Copy');
                setButtonIcon(<Copy className="h-4 w-4" />);
            }, 3000);
        }
        */
        navigator.clipboard.writeText(apiUrl!);
        setCopied(true);
      
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                    Link
                    </Label>
                    <Input
                        id="link"
                        disabled
                        defaultValue={apiUrl}
                        readOnly
                        //className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 pointer-events-none"
                        className="pointer-events-none"
                    />
                </div>
                <Button 
                    //type="submit" 
                    size="sm" 
                    className="px-3"
                    onClick={handleCopyClick}
                >
                    <span className="sr-only">Copy</span>
                    {copied ? < Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                    Close
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
