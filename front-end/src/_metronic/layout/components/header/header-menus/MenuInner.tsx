import { useIntl } from 'react-intl'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.PAYMENT' })} to='/payment' />
      <MenuItem title={intl.formatMessage({ id: 'MENU.SHIFT' })} to='/shift' />
      {/*    <MenuInnerWithSub
        title='Pages'
        to='/crafted/pages'
        fontIcon='bi-archive'
        hasArrow={true}
        menuPlacement='right-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuInnerWithSub
          title='Profile'
          to='/crafted/pages/profile'
          hasArrow={true}
          hasBullet={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <MenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <MenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <MenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <MenuItem to='/crafted/pages/profile/connections' title='Connections' hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>

      <MenuInnerWithSub
        isMega={true}
        title='Mega menu'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  )
}
