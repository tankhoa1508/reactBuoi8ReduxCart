import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCats, deleteCat, addNewCat, reCheckCat} from '../redux/catsSlice'
import { Button, Container, Input, Pagination, Table } from 'reactstrap';

export default function Cats() {
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch();
    const { cats } = useSelector((state) => state.cats)
    useEffect(() => {
        dispatch(fetchCats(currentPage))
    },[currentPage])

    const handle_delete=(id)=>{
        dispatch(deleteCat(id))
    }

    const handle_add=(cat)=>{
        dispatch(addNewCat(cat))
    }

    const handle_rechecked = (cat) =>{
        dispatch(reCheckCat(cat))
    }

    //Hàm xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`)
        setCurrentPage(pageNumber);
    }
  return (
    <div>
        <Container>
            <Input placeholder='Name' onKeyDown={(e)=>{
                if (e.key ==="Enter"){
                    handle_add({name:"le van meo", checked:false})
                }
            }}/>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cats.map((item, index) =>
                        <tr key={index}>
                            <td scope='row'>
                                {item.id}
                            </td>
                            <td className={item.checked?"cat-name active":"cat-name"}
                            onClick={()=>handle_rechecked(item)}>
                                {item.name}
                            </td>
                            <td>
                                {item.checked?"true":"false"}
                            </td>
                            <td>
                                <Button onClick={()=>handle_delete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </Table>

            <Pagination
                activePage={currentPage}
                itemsCountPerPage={6}
                totalItemsCount={totalPage}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
            />
        </Container>
    </div>
  )
}
