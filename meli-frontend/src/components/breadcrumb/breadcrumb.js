import BootstrapBreadcrumb from 'react-bootstrap/Breadcrumb';

export default function Breadcrumb(props){
    const {categories} = props
    const mutableCategories = [...categories]
    const active = mutableCategories.pop();
    return(
        <BootstrapBreadcrumb>
            {
                mutableCategories.map(category => {
                   return <BootstrapBreadcrumb.Item href="#" key={category} className="link-secondary">{category}</BootstrapBreadcrumb.Item>
                })
            }
            <BootstrapBreadcrumb.Item active>{active}</BootstrapBreadcrumb.Item>
        </BootstrapBreadcrumb>
    )
}