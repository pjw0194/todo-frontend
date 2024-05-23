import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onDelete, onUpdate }) => {
	const handleDelet = async () => {
		onDelete(item._id);
	};
	const handleUpdate = async () => {
		onUpdate(item._id, item.isComplete);
	};

	const itemClass = `todo-item ${item.isComplete ? "item-complete" : ""}`;

	return (
		<Row>
			<Col xs={12}>
				<div className={itemClass}>
					<div className="todo-content">{item.task}</div>

					<div>
						<button className="button-delete" onClick={handleDelet}>
							삭제
						</button>
						<button className="button-delete" onClick={handleUpdate}>
							{item.isComplete ? "안끝남" : "끝남"}
						</button>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default TodoItem;
