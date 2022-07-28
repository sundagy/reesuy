import { ButtonList, DrawerHeader, DrawerMain, DrawerFooter, Hr  } from ".electronext"

export const Menu = () => {

  return (<>
    <DrawerHeader>
      <ButtonList label="Home"/>
    </DrawerHeader>
    <DrawerMain>
      <Hr/>
      <ButtonList label="Team Members"/>
      <ButtonList label="Stats"/>
    </DrawerMain>
    <DrawerFooter>
      <ButtonList label="Settings" icon={'⚙️'}/>
    </DrawerFooter>
  </>)
}