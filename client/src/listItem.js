const ListItem = ({ item, onDelete }) => {
  return (
    <div>
      <h3>
        {item.title}
      </h3>
      <button onClick ={()=> onDelete(item._id)}>Remove item</button>
      <p>{item.content}</p>
    </div>
  )
}

export default ListItem
