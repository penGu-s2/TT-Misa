<template>
      <div class="modal" id="detail-employee" method="POST" employeeId="">
        <div class="container">
            <div class="modal-header">
                <div class="tittle">Thông tin nhân viên
                </div>
                <div class="close-modal-site">
                    <button class="close">&times;</button>
                </div>
            </div>
            <div class="modal-content">
                <div class="row" style="padding: 0 24px;">
                    <div class="col-3">
                        <div class="avatar-box">
                            <div class="avatar-site"></div>
                           
                        </div>
                         <p class="note" style="text-align: center;">(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif)</p>
                    </div>
                    <div class="col-9 ">
                        <div class="info-box-general">
                            <div class="row title-info-box" style="margin-top: 0 !important; padding-left: 16px;">
                                <div class="tittle" style="font-size: 15px;">A. Thông tin chung :
                                    <div class="progress-bottom"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Mã nhân viên(<span style="color: red;">*</span>)</p>
                                            <input type="text" required class="input" name="EmployeeCode" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Họ và tên(<span style="color: red;">*</span>)</p>
                                            <input type="text" required class="input" name="FullName" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Ngày sinh</p>
                                            <input type="date" class="input" name="DateOfBirth" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Giới tính</p>
                                            <div class="dropdown" name="GenderName" value="1" style="width: 100%;">
                                                <div class="drop-text-site">
                                                    <div class="drop-text">Nam</div>
                                                    <div class="drop-icon">
                                                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                <div class="drop-data-site">
                                                    <div class="drop-item selected" value="1">
                                                        <div class="checked-icon">
                                                            <i class="fa fa-check" aria-hidden="true"></i>
                                                        </div>
                                                        <div class="item-text">Nam</div>
                                                    </div>
                                                    <div class="drop-item" value="0">
                                                        <div class="checked-icon"></div>
                                                        <div class="item-text">Nữ</div>
                                                    </div>
                                                    <div class="drop-item" value="2">
                                                        <div class="checked-icon"></div>
                                                        <div class="item-text">Không xác định</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6"></div>
                                <div class="col-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Số CMTND/ Căn cước(<span style="color: red;">*</span>)
                                            </p>
                                            <input type="text" required class="input" name="IdentityNumber" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Ngày cấp(<span style="color: red;">*</span>)</p>
                                            <input type="date" required class="input" name="IdentityDate" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Nơi cấp</p>
                                            <input type="text" class="input" name="IdentityPlace" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="col-item">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Email(<span style="color: red;">*</span>)</p>
                                            <input type="email" pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" required class="input" name="Email" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="col-item">
                                        <div class="label-input">
                                            <p class="label">Số điện thoại(<span style="color: red;">*</span>)</p>
                                            <input type="text" required class="input" name="PhoneNumber" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-box-job">
                            <div class="tittle title-info-box" style="font-size: 15px; padding-left: 16px;">
                                B. Thông tin công việc :
                                <div class="progress-bottom"></div>
                            </div>
                            <div class="row">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="col-item">
                                            <div class="label-input">
                                                <p class="label">Vị trí</p>
                                                <div class="dropdown position position-modal" name="PositionName" value="" style="width: 100%;">
                                                    <div class="drop-text-site">
                                                        <div class="drop-text"></div>
                                                        <div class="drop-icon">
                                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                    <div class="drop-data-site">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="col-item">
                                            <div class="label-input">
                                                <p class="label">Phòng ban</p>
                                                <div class="dropdown department department-modal" name="DepartmentName" value="" style="width: 100%;">
                                                    <div class="drop-text-site">
                                                        <div class="drop-text"></div>
                                                        <div class="drop-icon">
                                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                    <div class="drop-data-site">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="col-item">
                                            <div class="label-input">
                                                <p class="label">Mã số thuế</p>
                                                <input type="text" class="input">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="col-item">
                                            <div class="label-input">
                                                <p class="label">Mức lương cơ bản</p>
                                                <div style="position: relative;display: flex;">
                                                    <input type="text" class="input salary-input-box" name="Salary" value="">
                                                    <div class="price-txt">(VNĐ)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="col-item">
                                            <div class="label-input">
                                                <p class="label">Ngày gia nhập công ty</p>
                                                <input type="date" class="input" name="JoinDate">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="col-item">
                                            <div class="label-input">
                                                <p class="label">Tình trạng công việc</p>
                                                <div class="dropdown" name="WorkStatus" style="width: 100%;">
                                                    <div class="drop-text-site">
                                                        <div class="drop-text">Đang làm việc</div>
                                                        <div class="drop-icon">
                                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                                        </div>
                                                    </div>
                                                    <div class="drop-data-site">
                                                        <div class="drop-item selected">
                                                            <div class="checked-icon">
                                                                <i class="fa fa-check" aria-hidden="true"></i>
                                                            </div>
                                                            <div class="item-text">Đang làm việc</div>
                                                        </div>
                                                        <div class="drop-item">
                                                            <div class="checked-icon"></div>
                                                            <div class="item-text">Đã nghỉ việc</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="modal-action">
                    <div class="action-box">
                        <button class="btn-default cancel">Hủy</button>
                        <button class="btn-icon" id="btnSave">
                            <i class="fa fa-save"></i>
                            Lưu
                        </button>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>

<style scoped>
@import "../../css/pages/employee-detail.css";
</style>