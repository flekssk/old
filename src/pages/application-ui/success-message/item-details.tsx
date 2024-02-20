import { Button, Modal } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";

const SuccessMessageWithItemDetails: FC = function () {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="mx-auto">
        Show success message
      </Button>
      <Modal
        onClose={() => setShowModal(false)}
        popup
        size="md"
        show={showModal}
      >
        <Modal.Body className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <svg
            aria-hidden
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4 w-11 h-11 text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Success icon</span>
          <div className="flex items-center justify-center p-2 mb-3.5 space-x-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <img
              alt="iMac"
              src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-side-image.png"
              className="w-11 h-11"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white">
                Apple iMac 27"
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                256GB SSD, Apple M1
              </p>
            </div>
          </div>
          <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
            This product was successfully deleted.
          </p>
          <Button onClick={() => setShowModal(false)} className="inline-flex" size="sm">
            Continue
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SuccessMessageWithItemDetails;