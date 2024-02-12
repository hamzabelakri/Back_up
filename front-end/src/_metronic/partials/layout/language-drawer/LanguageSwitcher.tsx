import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../helpers'
import {setLanguage, useLang} from '../../../i18n/Metronici18n'

const LanguageSwitcher = () => {
  const languages = [
    {
      lang: 'en',
      name: 'English',
      flag: toAbsoluteUrl('/media/flags/united-states.svg'),
    },
    {
      lang: 'ar',
      name: 'Arabic',
      flag: toAbsoluteUrl('/media/flags/kuwait.svg'),
    },
    {
      lang: 'pk',
      name: 'Urdu',
      flag: toAbsoluteUrl('/media/flags/pakistan.svg'),
    },
  ]
  const itemClass = 'ms-1 ms-md-4'
  const userAvatarClass = 'symbol-35px'

  const lang = useLang()
  const currentLanguage = languages.find((x) => x.lang === lang)
  return (
    <div className={clsx('app-navbar-item')}>
      <div
        className={clsx('cursor-pointer symbol', userAvatarClass)}
        data-kt-menu-trigger="{default: 'click'}"
        data-kt-menu-attach='parent'
        data-kt-menu-placement='bottom-end'
      >
        <div className={clsx('app-navbar-item', itemClass)}>
          <div className=''>
            <span className='fs-8 rounded bg-light px-3 py-2 translate-middle-y top-50 end-0'>
              {currentLanguage?.name}{' '}
              <img
                className='w-15px h-15px rounded-1 ms-2'
                src={currentLanguage?.flag}
                alt='metronic'
              />
            </span>
          </div>
          <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-175px py-4' data-kt-menu='true'>
            {languages.map((l) => (
              <div
                className='menu-item px-3'
                key={l.lang}
                onClick={() => {
                  setLanguage(l.lang)
                }}
              >
                <a
                  href='#'
                  className={clsx('menu-link d-flex px-5', {
                    active: l.lang === currentLanguage?.lang,
                  })}
                >
                  <span className='symbol symbol-20px me-4'>
                    <img className='rounded-1' src={l.flag} alt='metronic' />
                  </span>
                  {l.name}
                </a>
              </div>
            ))}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export {LanguageSwitcher}
