import { Accordion as FlowbiteAccordion } from "flowbite-react";
import type { PropsWithChildren } from "react";

type Props = {
  title: string;
};

export const Accordion = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <FlowbiteAccordion className="bg-white">
      <FlowbiteAccordion.Panel>
        <FlowbiteAccordion.Title className="text-black">
          {title}
        </FlowbiteAccordion.Title>
        <FlowbiteAccordion.Content>{children}</FlowbiteAccordion.Content>
      </FlowbiteAccordion.Panel>
    </FlowbiteAccordion>
  );
};
