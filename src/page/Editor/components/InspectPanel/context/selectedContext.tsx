import { createContext, ReactNode, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWidgetInspectBySelectId } from "@/redux/inspect/inspectSelector"
import { inspectActions } from "@/redux/inspect/inspectSlice"
import { dslActions } from "@/redux/editor/dsl/dslSlice"

interface Injected {
  configPanel: Record<string, any>
  handleUpdateDsl: (value: any) => void
  handleUpdateConfigPanel: (value: Record<string, any>) => void
}

export const SelectedPanelContext = createContext<Injected>({} as Injected)

interface Props {
  children?: ReactNode
}

// TODO: only support single select,wait to multi
export const SelectedProvider: FC<Props> = ({ children }) => {
  const panelConfig = useSelector(getWidgetInspectBySelectId) ?? {}

  const dispatch = useDispatch()

  const handleUpdateConfigPanel = (value: Record<string, any>) => {
    dispatch(
      inspectActions.updateWidgetPanelConfig({
        id: panelConfig.id,
        value,
      }),
    )
  }

  const handleUpdateDsl = (value: Record<string, any>) => {
    dispatch(
      dslActions.updateDslProps({
        targetId: panelConfig.id,
        newState: {
          ...value,
        },
      }),
    )
  }

  const value = {
    configPanel: panelConfig,
    handleUpdateDsl: handleUpdateDsl,
    handleUpdateConfigPanel,
  }

  return (
    <SelectedPanelContext.Provider value={value}>
      {children}
    </SelectedPanelContext.Provider>
  )
}

SelectedProvider.displayName = "SingleSelectContext"
