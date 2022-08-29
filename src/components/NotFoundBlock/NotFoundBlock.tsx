import s from './NotFoundBlock.module.scss'

export const NotFoundBlock = () => {
	return (
    <div className={s.root}>
		  <h1>Ничего не найдено</h1>
      <div className={s.description}>К сожалению данная страница отсутствует</div>
    </div>
	)
}
