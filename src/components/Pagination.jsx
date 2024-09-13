import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      <span className="text-strawberry-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-strawberry-500 hover:bg-strawberry-600 text-white">
        Next <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;