'use client';

import { Button } from "@/components/ui/button"
import generatePDF from "./generate-pdf";
import { toast } from "sonner";

interface DownloadButtonProps {
    buyers: any[] | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ buyers }) => {
    const handleDownload = () => {
      if (buyers !== null && buyers.length > 0) {
        generatePDF(buyers);
        toast.success("File downloaded successfully");

      } else {
        toast.error("Download failed. No buyers available");

      }
    };
  
    return (
      <Button onClick={handleDownload}>
        Download
      </Button>
    );
  };
export default DownloadButton;
