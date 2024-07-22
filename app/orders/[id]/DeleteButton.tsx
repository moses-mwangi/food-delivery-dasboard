import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

export default function DeleteButton() {
  return (
    <div>
      <Button
        className="bg-blue-700 hover:bg-blue-600 w-24 h-8"
        onClick={() => {
          toast("Order deletion canceled", {
            description: "Only admin users can delete",
            action: {
              label: "remove",
              onClick: () => console.log("Undo"),
            },
          });
        }}
      >
        Delete Order
      </Button>
    </div>
  );
}
