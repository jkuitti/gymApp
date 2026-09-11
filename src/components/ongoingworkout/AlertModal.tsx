type StartProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertModal = ({ setOpenModal }: StartProps) => {
  return (
    <div>
      <div className="fixed bg-black/50 inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0" onClick={() => setOpenModal(false)} />

        <div
          className="relative z-10 w-full max-w-md border-[#424242] border-1 rounded-xl bg-black p-6 shadow-lg flex flex-col justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-white text-xl font-bold text-center">
            Enter Weight and Reps
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
