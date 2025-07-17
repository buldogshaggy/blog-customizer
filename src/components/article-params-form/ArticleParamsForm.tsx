import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	type OptionType,
	defaultArticleState,
	type ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
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
					<Text as='h2' size={38} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formData.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						selected={formData.fontSizeOption}
						name='fontSize'
						onChange={handleChange('fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						selected={formData.fontColor}
						onChange={handleChange('fontColor')}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formData.backgroundColor}
						onChange={handleChange('backgroundColor')}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						selected={formData.contentWidth}
						onChange={handleChange('contentWidth')}
						options={contentWidthArr}
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
