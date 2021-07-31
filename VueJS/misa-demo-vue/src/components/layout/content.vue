<template>
      <div class="content">
        <div class="container">
            <div class="content-header">
                <div class="heading">
                    <p class="tittle">Danh sách nhân viên</p>
                    <div class="add-employee-site">
                        <button class="btn-icon" id="add-employee-btn">
                            <i class="fa fa-user-plus"></i>
                            Thêm nhân viên
                        </button>
                    </div>

                </div>
                <div class="filter">
                    <div class="search-box filter-item">
                        <div class="box">
                            <div class="search-icon-site">
                                <i class="fa fa-search"></i>
                            </div>
                            <input type="text" class="input-search" placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại">
                            <div class="reset-txt-icon">
                                <i class="fa fa-times-circle reset-icon" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown filter-item department" name="department">
                        <div class="drop-text-site">
                            <div class="drop-text">Tất cả phòng ban</div>
                            <div class="drop-icon">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="drop-data-site">
                        </div>
                    </div>
                    <div class="dropdown filter-item position">
                        <div class="drop-text-site">
                            <div class="drop-text">Tất cả vị trí</div>
                            <div class="drop-icon">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="drop-data-site">
                        </div>
                    </div>
                    <button class="reload-site" id="reloadBtn">
                        <div class="reload-icon"></div>
                    </button>
                </div>
            </div>
            <div class="content-body">
                <table class="tbl tbl-striped" id="misa-datatable">
                    <thead>
                        <tr>
                             <th>Mã nhân viên</th>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Điện thoại</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Phòng ban</th>
                <th class="txt-align-right">Mức lương cơ bản</th>
                <th>Trạng thái công việc</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr v-for="employee in employees" :key="employee.EmployeeId">
                <td>{{ employee.EmployeeCode }}</td>
                <td>{{ employee.FullName }}</td>
                <td>{{ employee.GenderName }}</td>
                <td>{{ employee.DateOfBirth }}</td>
                <td>{{ employee.PhoneNumber }}</td>
                <td>{{ employee.Email }}</td>
                <td>{{ employee.PositionName }}</td>
                <td>{{ employee.DepartmentName }}</td>
                <td>{{ employee.Salary }}</td>
                <td class="txt-align-center">{{ employee.WorkStatus }}</td>
              </tr>
                    </tbody>

                </table>
            </div>
            <div class="content-footer">
                <div class="paging">
                    <div class="pagintation-text">
                        <p>Hiển thị 1-10/1000 nhân viên</p>
                    </div>
                    <div class="pagination">
                        <div class="back-to-start"></div>
                        <div class="pre-page"></div>
                        <div class="number-page">
                            <div class="number">
                                <div class="number-text">1</div>
                            </div>
                            <div class="number">
                                <div class="number-text">2</div>
                            </div>
                            <div class="number">
                                <div class="number-text">3</div>
                            </div>
                        </div>
                        <div class="next-page"></div>
                        <div class="go-to-end"></div>
                    </div>
                    <div class="pagination-total">
                        <p>10 nhân viên/trang</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Employee",
  created() {
    var self = this;
    axios.get("http://cukcuk.manhnv.net/v1/Employees").then(function (res) {
      self.employees = res.data;
    });
  },
  data() {
    return {
      employees: [],
    };
  },
};
</script>

<style scoped>
@import "../../css/layout/content.css";
</style>