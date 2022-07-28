import styled from "styled-components"

const CustomTitleBar = styled.div`
  display: flex;
  gap: 0.5rem;
  user-select: none;
  position: relative;
  -webkit-app-region: drag;
  z-index: 0;

  & .window-appicon {
    padding: 0.3rem 0.3rem;
  }
  & .window-menubar {
    display: flex;
    -webkit-app-region: no-drag;

    & span {  
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      height: 100%;
      &:hover {
        background-color: #00000145;
      }
    }
  }
  & .window-title {
    position: absolute;
    padding: 0.3rem 0.3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: -1;
  }

  & .window-controls {
    font-family: "Segoe MDL2 Assets", sans-serif;
    text-rendering: geometricPrecision;

    display: flex;
    margin-left: auto;
    font-size: 0.7rem;
    -webkit-app-region: no-drag;

    & span {  
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      height: 100%;
      &:hover {
        background-color: #00000145;
      }
    }
  }
`


export const TitleBar = () => {

  return (<>
    <CustomTitleBar>
      <div className='window-appicon'>😁</div>
      <div className='window-menubar'>
        <span>File</span>
        <span>Edit</span>
        <span>Help</span>
      </div>
      <div className='window-title'>Your App Title</div>
      <div className='window-controls'>
        <span onClick={MinimizeApp}> &#xE921; </span>
        <span onClick={MaximizeApp}> &#xE922; </span>
        <span onClick={CloseApp}> &#xE8BB; </span>
      </div>
    </CustomTitleBar>
  </>)
}

const Electron = globalThis.Electron

const MinimizeApp = () => {
  Electron.ipcRenderer.send('MinimizeApp')
}
const MaximizeApp = () => {
  Electron.ipcRenderer.send('MaximizeApp')
}
const CloseApp = () => {
  Electron.ipcRenderer.send('CloseApp')
}