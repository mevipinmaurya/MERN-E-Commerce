import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
        <div className="descriptionBox-navigator">
            <div className="descriptionBox-nav-box">Description</div>
            <div className="descriptionBox-nav-box fade">Review (122)</div>
        </div>
        <div className="descriptionBox-description">
            <p>An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtuall marketplace where businesses and individuals showcase their products, and interact with their customers without need for any physical presence. E-commerce website have gained an emense popularity due to their convienence accessbility, and the global reach they offer.</p>
            <p>E-commerce websites typically display the products and services along with detailed description, images, prices and any available variations (e.g. size and colors). Each products has usually its own dedicated page with relevant information.</p>
        </div>
    </div>
  )
}

export default DescriptionBox