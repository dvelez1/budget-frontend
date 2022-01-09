<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <h1 class="display-4 text-center">Home Budget</h1>
              </div>
            </div>
            <hr />
            <!-- Master Selection -->
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-center">Biweekly Selection</h5>
                    <hr />
                    <h6>Year</h6>
                    <select class="form-select">
                      <option selected>Select Year</option>
                      <option value="1">2021</option>
                      <option value="2">2022</option>
                    </select>

                    <h6 class="mt-2">Biweekly</h6>
                    <div class="mt-2">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadio-biweekly"
                          id="flexRadio-biweekly-1"
                        />
                        <label
                          class="form-check-label"
                          for="flexRadio-biweekly-1"
                        >
                          1
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadio-biweekly"
                          id="flexRadio-biweekly-2"
                          checked
                        />
                        <label
                          class="form-check-label"
                          for="flexRadio-biweekly-2"
                        >
                          2
                        </label>
                      </div>
                    </div>

                    <div class="mt-2">
                      <h6>Budget</h6>
                      <input type="text" class="form-control" id="txtBudget" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-center">Budget</h5>
                    <hr />
                    <div class="row">
                      <div class="col md-9">
                        <div>
                          <label>Description of the item.</label>
                        </div>
                      </div>
                      <div class="col md-3">
                        <div class="d-flex justify-content-between">
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Budget"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Payment"
                            />
                          </div>
                          <div>
                            <input
                              class="btn btn-success btn-sm"
                              type="button"
                              value="Save"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- CREDIT EXPENSES -->
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-11">
                        <h5 class="card-title text-center">Credit Expenses</h5>
                      </div>
                      <div class="col-sm-1">
                        <input
                          class="btn btn-primary btn-sm float-end"
                          type="button"
                          value="Add"
                        />
                      </div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col md-8">
                        <div>
                          <label>Description of the item.</label>
                        </div>
                      </div>
                      <div class="col md-4">
                        <div class="d-flex justify-content-between">
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Cost"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Payment"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="difference"
                            />
                          </div>
                          <div>
                            <input
                              class="btn btn-success btn-sm"
                              type="button"
                              value="Save"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ADDITIONAL EXPENSES -->
            <div class="row">
              <div class="col-md-6 mt-2">
                <div class="card">
                  <div class="card-body">
                    <div class="row g-2">
                      <div class="col-sm-11">
                        <h5 class="card-title text-center">
                          Additional Expenses
                        </h5>
                      </div>
                      <div class="col-sm-1">
                        <input
                          class="btn btn-primary  btn-sm float-end"
                          type="button"
                          value="Add"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col md-10">
                        <div>
                          <label>Description of the item.</label>
                        </div>
                      </div>
                      <div class="col md-2">
                        <div class="d-flex justify-content-between">
                          <div>
                            <input
                              type="text"
                              class="form-control form-control-sm"
                              placeholder="Budget"
                            />
                          </div>
                          <div>
                            <input
                              class="btn btn-success btn-sm"
                              type="button"
                              value="Save"
                            />
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
  </div>
</template>

<script>
export default {
  name: "Budget",
};
</script>

<style  scoped>
</style>