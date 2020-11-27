interface ISql {
    [index : string] : string;
}

const TSql = {} as ISql;
TSql['KtgFindAll'] = "select * from tbl_category;";
TSql['KtgFindByKode'] = "select * from tbl_category where kode = $1;";
TSql['KtgFindByKode'] = "select * from tbl_category where kode in($1, $2, $3);";
TSql['BlogInfoFindAll'] = "select * from tbl_bloginfo;";

export default TSql;