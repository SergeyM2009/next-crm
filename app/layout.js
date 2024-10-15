import Navigation from './../src/components/Navigation';
import './../src/assets/sass/globals.scss';
import { Open_Sans } from 'next/font/google';

const opensans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'CRM приложение',
  description: 'Приложение для создания, просмотра и редактирования заявок',
}

export default function RootLayout({ children }) {

  return (
    <html lang="ru">
      <body> 
        <Navigation  opensans={opensans}/>
        <div className={opensans.className}>
        {/* <div className={classes.container + " " + opensans.className}> */}
        {children}
        </div>
        </body>
    </html>
  )
}
