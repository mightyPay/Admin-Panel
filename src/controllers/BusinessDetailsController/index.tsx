import React, { useState } from "react";
import { ModalV1 } from "../../components";

function ModalV1WithController({ className, Controller }: any) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Controller onClick={() => setOpen(!open)} />
      <ModalV1 open={open} setOpen={setOpen} className={className}>
        <h1>Modal V1</h1>
      </ModalV1>
    </div>
  );
}

export default ModalV1WithController;
