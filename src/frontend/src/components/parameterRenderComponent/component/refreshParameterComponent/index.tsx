import { RefreshButton } from "@/components/ui/refreshButton";
import { usePostTemplateValue } from "@/controllers/API/queries/nodes/use-post-template-value";
import { mutateTemplate } from "@/CustomNodes/helpers/mutate-template";
import useAlertStore from "@/stores/alertStore";

export function RefreshParameterComponent({
  children,
  templateData,
  disabled,
  nodeClass,
  editNode,
  handleNodeClass,
  nodeId,
  name,
}) {
  const postTemplateValue = usePostTemplateValue({
    parameterId: name,
    nodeId: nodeId,
    node: nodeClass,
  });

  const setErrorData = useAlertStore((state) => state.setErrorData);
  const handleRefreshButtonPress = () =>
    mutateTemplate(
      templateData.value,
      nodeClass,
      handleNodeClass,
      postTemplateValue,
      setErrorData,
    );
  return (
    (children || templateData.refresh_button) && (
      <div className="flex w-full items-center justify-between gap-2">
        {children}
        {templateData.refresh_button && (
          <div className="shrink-0 flex-col">
            <RefreshButton
              isLoading={postTemplateValue.isPending}
              disabled={disabled}
              editNode={editNode}
              button_text={templateData.refresh_button_text}
              handleUpdateValues={handleRefreshButtonPress}
              id={"refresh-button-" + name}
            />
          </div>
        )}
      </div>
    )
  );
}
