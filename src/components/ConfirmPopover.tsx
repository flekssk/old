// import { Button, Popover } from "flowbite-react";
// import type { FC, ReactNode } from "react";

// type ConfirmPopoverProps = {
//   onConfirm: () => void;
//   onCancel: () => void;
//   title: string;
//   body: ReactNode;
//   children: ReactNode;
//   cancelText?: string;
//   confirmText?: string;
//   confirmButtonColor?: "primary" | "grey" | "red" | "green";
// };

// export const ConfirmPopover: FC<ConfirmPopoverProps> = ({
//   onConfirm,
//   onCancel,
//   title,
//   body,
//   children,
//   cancelText = "Отменить",
//   confirmText = "Подтвердить",
//   confirmButtonColor = "primary",
// }) => {
//   return (
//     <Popover
//       content={
//         <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
//           <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
//             <h3
//               id="default-popover"
//               className="font-semibold text-gray-900 dark:text-white"
//             >
//               {title}
//             </h3>
//           </div>
//           <div className="px-3 py-2">
//             <p>{body}</p>
//           </div>
//           <div className="flex py-2 justify-between">
//             <Button color="grey" onClick={onCancel}>
//               {cancelText}
//             </Button>
//             <Button color={confirmButtonColor} onClick={onConfirm}>
//               {confirmText}
//             </Button>
//           </div>
//         </div>
//       }
//     >
//       {children}
//     </Popover>
//   );
// };
