<template>
       <div class="header">
        <div class="container">
            <div class="header-left">
                <div class="dropdown" id="branch">
                    <div class="drop-text-site">
                        <div class="drop-text">
                            Nhà hàng Biển Đông
                        </div>
                        <div class="drop-icon">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="drop-data-site">
                        <div class="drop-item selected" data-value="1">
                            <div class="checked-icon">
                                <i class="fa fa-check"></i>
                            </div>
                            <div class="item-text">Nhà hàng Biển Đông</div>
                        </div>
                        <div class="drop-item" data-value="2">
                            <div class="checked-icon"></div>
                            <div class="item-text">Nhà hàng Biển Tây</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-right">
                <div class="information-site">
                    <div class="avatar-logo"></div>
                    <div class="username">Nguyễn Đức Thắng</div>
                </div>
                <div class="more-icon"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>

<style scoped>
@import "../../css/layout/header.css";
</style>