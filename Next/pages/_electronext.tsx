import ElectroNextApp from 'electronext'
import type { enConfigAppType } from 'electronext'
import enconfig from '../enconfig.json'
//add your new imports below ¬

const AppElectroNext = (props) => {
  const config = enconfig as enConfigAppType
  return (
    <ElectroNextApp 
      Electron={globalThis.Electron}  
      config={config}
      children={props.children}
    />
  )
}

export default AppElectroNext