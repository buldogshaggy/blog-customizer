import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
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

type ArticleParamsFormProps = {
	onUpdateStyles: (styles: Record<string, string>) => void;
};

export const ArticleParamsForm = ({
	onUpdateStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLFormElement>(null);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleChange =
		(key: keyof ArticleStateType) => (selected: OptionType) => {
			setFormData((prev) => ({ ...prev, [key]: selected }));
		};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const styles = {
			'--font-family': formData.fontFamilyOption.value,
			'--font-size': formData.fontSizeOption.value,
			'--font-color': formData.fontColor.value,
			'--container-width': formData.contentWidth.value,
			'--bg-color': formData.backgroundColor.value,
		};

		onUpdateStyles(styles);

		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFormData(defaultArticleState);

		const styles = {
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		};

		onUpdateStyles(styles);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
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
