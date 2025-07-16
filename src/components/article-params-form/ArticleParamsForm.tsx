import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	type OptionType,
	defaultArticleState,
	type ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	const handleChange =
		(key: keyof ArticleStateType) => (selected: OptionType) => {
			setFormData((prev) => ({ ...prev, [key]: selected }));
		};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						selected={formData.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
						options={fontFamilyOptions}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
