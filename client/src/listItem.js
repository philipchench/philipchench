const ListItem = ({ item, onDelete }) => {
  return (
    <div className = "item">
        <div className = "listTitle">
            <h3>
                {item.title}
            </h3>
            <button onClick ={()=> onDelete(item._id)}>Remove</button>
        </div>
        <p className = "listContent">{item.content}</p>
    </div>
  )
}

export default ListItem
