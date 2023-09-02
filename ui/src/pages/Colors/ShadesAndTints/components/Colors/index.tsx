import { Card, Typography } from "antd";
import { getTextColor } from "lib/utils/helper";
import Clipboard from "components/RenderProps/Clipboard";
import ClipboardButton from "components/General/ClipboardButton";
import { ExtendedColorsProps } from "pages/Colors/ShadesAndTints/utils/types";
import styles from "./Colors.module.scss";

const { Title } = Typography;

const Colors: React.FC<ExtendedColorsProps> = ({
	colors,
	isPending,
	title,
	type,
}) => {
	if (colors.length === 0) return null;
	return (
		<Card className={styles.colors}>
			<div className={styles.colors__list}>
				{isPending ? (
					<Title level={4}>{title}</Title>
				) : (
					colors.map((color, index) => (
						<Card
							key={`${index}-${type}-${color}`}
							style={{
								backgroundColor: color,
								color: getTextColor(color),
							}}
						>
							<div className={styles.colors__list_item}>
								{index + 1}
								<Title
									level={4}
									style={{ color: getTextColor(color) }}
								>
									{color}
								</Title>
								<Clipboard
									text={color}
									clipboardComponent={ClipboardButton}
								/>
							</div>
						</Card>
					))
				)}
			</div>
		</Card>
	);
};

export default Colors;