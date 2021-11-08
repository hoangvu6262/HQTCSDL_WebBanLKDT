import axios from 'axios';
import action from './action';

// Get list user
export const GetAllUser = () => {
    return (dispatch) => {
        const headers = {
            Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFY29tbWVyY2VTaG9wQVBJIiwianRpIjoiMDBiNjY0YWYtYmY5Ny00YjEwLTlhMmQtMDQyODcyZTE0YjFlIiwiaWF0IjoiMTEvNS8yMDIxIDY6MDM6MjkgUE0iLCJUZW5EYW5nTmhhcCI6InN0cmluZyAgICAgICAgICAgICAgICAgICAgICAgICIsIk1hdEtoYXUiOiJzdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICIsImV4cCI6MTYzNjM5NDYwOSwiaXNzIjoiRWNvbW1lcmNlU2hvcEFQSUF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiRWNvbW1lcmNlU2hvcEFQSVNlcnZpY2VQb3N0bWFuQ2xpZW50In0.UWZFAdH11OFoOVcIUnHawf8Ks-PxpmFltYqrKjguVUc`,
        }

        axios.get('http://localhost:31051/api/KhachHang/2')
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}