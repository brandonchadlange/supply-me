<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Profile component
 */
export default {
  components: { PageHeader },
  page: {
    title: "Profile",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: "Profile",
      items: [
        {
          text: "Contacts",
        },
        {
          text: "Profile",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />

    <div class="card mb-0">
      <b-tabs content-class="p-4" justified class="nav-tabs-custom">
        <b-tab active>
          <template v-slot:title>
            <i class="uil uil-user-circle font-size-20"></i>
            <span class="d-none d-sm-block">About</span>
          </template>
          <div>
            <div>
              <h5 class="font-size-16 mb-4">Projects</h5>

              <div class="table-responsive">
                <table class="table table-nowrap table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Projects</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col" style="width: 120px;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">01</th>
                      <td>
                        <a href="#" class="text-dark">Brand Logo Design</a>
                      </td>
                      <td>18 Jun, 2020</td>
                      <td>
                        <span class="badge bg-soft-primary font-size-12"
                          >Open</span
                        >
                      </td>
                      <td>
                        <b-dropdown
                          right
                          toggle-class="text-muted font-size-18 px-2 p-0"
                          variant="white"
                          menu-class="dropdown-menu-end"
                        >
                          <template v-slot:button-content>
                            <i class="uil uil-ellipsis-v"></i>
                          </template>

                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#"
                            >Something else here</a
                          >
                        </b-dropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">02</th>
                      <td>
                        <a href="#" class="text-dark">Minible Admin</a>
                      </td>
                      <td>06 Jun, 2020</td>
                      <td>
                        <span class="badge bg-soft-primary font-size-12"
                          >Open</span
                        >
                      </td>
                      <td>
                        <b-dropdown
                          right
                          toggle-class="text-muted font-size-18 px-2 p-0"
                          variant="white"
                          menu-class="dropdown-menu-end"
                        >
                          <template v-slot:button-content>
                            <i class="uil uil-ellipsis-v"></i>
                          </template>

                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#"
                            >Something else here</a
                          >
                        </b-dropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">03</th>
                      <td>
                        <a href="#" class="text-dark">Chat app Design</a>
                      </td>
                      <td>28 May, 2020</td>
                      <td>
                        <span class="badge bg-soft-success font-size-12"
                          >Complete</span
                        >
                      </td>
                      <td>
                        <b-dropdown
                          right
                          toggle-class="text-muted font-size-18 px-2 p-0"
                          variant="white"
                          menu-class="dropdown-menu-end"
                        >
                          <template v-slot:button-content>
                            <i class="uil uil-ellipsis-v"></i>
                          </template>

                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#"
                            >Something else here</a
                          >
                        </b-dropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">04</th>
                      <td>
                        <a href="#" class="text-dark">Minible Landing</a>
                      </td>
                      <td>13 May, 2020</td>
                      <td>
                        <span class="badge bg-soft-success font-size-12"
                          >Complete</span
                        >
                      </td>
                      <td>
                        <b-dropdown
                          right
                          toggle-class="text-muted font-size-18 px-2 p-0"
                          variant="white"
                          menu-class="dropdown-menu-end"
                        >
                          <template v-slot:button-content>
                            <i class="uil uil-ellipsis-v"></i>
                          </template>

                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#"
                            >Something else here</a
                          >
                        </b-dropdown>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">05</th>
                      <td>
                        <a href="#" class="text-dark">Authentication Pages</a>
                      </td>
                      <td>06 May, 2020</td>
                      <td>
                        <span class="badge bg-soft-success font-size-12"
                          >Complete</span
                        >
                      </td>
                      <td>
                        <b-dropdown
                          right
                          toggle-class="text-muted font-size-18 px-2 p-0"
                          variant="white"
                          menu-class="dropdown-menu-end"
                        >
                          <template v-slot:button-content>
                            <i class="uil uil-ellipsis-v"></i>
                          </template>

                          <a class="dropdown-item" href="#">Action</a>
                          <a class="dropdown-item" href="#">Another action</a>
                          <a class="dropdown-item" href="#"
                            >Something else here</a
                          >
                        </b-dropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <i class="uil uil-clipboard-notes font-size-20"></i>
            <span class="d-none d-sm-block">Tasks</span>
          </template>
          <div>
            <h5 class="font-size-16 mb-3">Active</h5>

            <div class="table-responsive">
              <table class="table table-nowrap table-centered">
                <tbody>
                  <tr>
                    <td style="width: 60px;">
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-activeCheck2"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-activeCheck2"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark"
                        >Ecommerce Product Detail</a
                      >
                    </td>

                    <td>27 May, 2020</td>
                    <td style="width: 160px;">
                      <span class="badge bg-soft-primary font-size-12"
                        >Active</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-activeCheck1"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-activeCheck1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark"
                        >Ecommerce Product</a
                      >
                    </td>

                    <td>26 May, 2020</td>
                    <td>
                      <span class="badge bg-soft-primary font-size-12"
                        >Active</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 class="font-size-16 my-3">Upcoming</h5>

            <div class="table-responsive">
              <table class="table table-nowrap table-centered">
                <tbody>
                  <tr>
                    <td style="width: 60px;">
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-upcomingCheck3"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-upcomingCheck3"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark">Chat app Page</a>
                    </td>

                    <td>-</td>
                    <td style="width: 160px;">
                      <span class="badge bg-soft-secondary font-size-12"
                        >Waiting</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-upcomingCheck2"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-upcomingCheck2"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark">Email Pages</a>
                    </td>

                    <td>04 June, 2020</td>
                    <td>
                      <span class="badge bg-soft-primary font-size-12"
                        >Approved</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-upcomingCheck1"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-upcomingCheck1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark"
                        >Contacts Profile Page</a
                      >
                    </td>

                    <td>-</td>
                    <td>
                      <span class="badge bg-soft-secondary font-size-12"
                        >Waiting</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 class="font-size-16 my-3">Complete</h5>

            <div class="table-responsive">
              <table class="table table-nowrap table-centered">
                <tbody>
                  <tr>
                    <td style="width: 60px;">
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-completeCheck3"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-completeCheck3"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark">UI Elements</a>
                    </td>

                    <td>27 May, 2020</td>
                    <td style="width: 160px;">
                      <span class="badge bg-soft-success font-size-12"
                        >Complete</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-completeCheck2"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-completeCheck2"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark"
                        >Authentication Pages</a
                      >
                    </td>

                    <td>27 May, 2020</td>
                    <td>
                      <span class="badge bg-soft-success font-size-12"
                        >Complete</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="custom-control custom-checkbox text-center">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="tasks-completeCheck1"
                        />
                        <label
                          class="custom-control-label"
                          for="tasks-completeCheck1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <a href="#" class="fw-bold text-dark">Admin Layout</a>
                    </td>

                    <td>26 May, 2020</td>
                    <td>
                      <span class="badge bg-soft-success font-size-12"
                        >Complete</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <i class="uil uil-envelope-alt font-size-20"></i>
            <span class="d-none d-sm-block">Messages</span>
          </template>
          <div>
            <div data-simplebar style="max-height: 430px;">
              <div class="media border-bottom py-4">
                <img
                  class="me-2 rounded-circle avatar-xs"
                  src="@/assets/images/users/avatar-3.jpg"
                  alt
                />
                <div class="media-body">
                  <h5 class="font-size-15 mt-0 mb-1">
                    Marion Walker
                    <small class="text-muted float-end">1 hr ago</small>
                  </h5>
                  <p class="text-muted">
                    If several languages coalesce, the grammar of the resulting
                    .
                  </p>

                  <a
                    href="javascript: void(0);"
                    class="text-muted font-13 d-inline-block"
                  >
                    <i class="mdi mdi-reply"></i> Reply
                  </a>

                  <div class="media mt-4">
                    <img
                      class="me-2 rounded-circle avatar-xs"
                      src="@/assets/images/users/avatar-4.jpg"
                      alt
                    />
                    <div class="media-body">
                      <h5 class="font-size-15 mt-0 mb-1">
                        Shanon Marvin
                        <small class="text-muted float-end">1 hr ago</small>
                      </h5>
                      <p class="text-muted">
                        It will be as simple as in fact, it will be Occidental.
                        To it will seem like simplified .
                      </p>

                      <a
                        href="javascript: void(0);"
                        class="text-muted font-13 d-inline-block"
                      >
                        <i class="mdi mdi-reply"></i> Reply
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="media border-bottom py-4">
                <img
                  class="me-2 rounded-circle avatar-xs"
                  src="@/assets/images/users/avatar-5.jpg"
                  alt
                />
                <div class="media-body">
                  <h5 class="font-size-15 mt-0 mb-1">
                    Janice Morgan
                    <small class="text-muted float-end">2 hrs ago</small>
                  </h5>
                  <p class="text-muted">
                    To achieve this, it would be necessary to have uniform
                    pronunciation.
                  </p>

                  <a
                    href="javascript: void(0);"
                    class="text-muted font-13 d-inline-block"
                  >
                    <i class="mdi mdi-reply"></i> Reply
                  </a>
                </div>
              </div>

              <div class="media border-bottom py-4">
                <img
                  class="me-2 rounded-circle avatar-xs"
                  src="@/assets/images/users/avatar-7.jpg"
                  alt
                />
                <div class="media-body">
                  <h5 class="font-size-15 mt-0 mb-1">
                    Patrick Petty
                    <small class="text-muted float-end">3 hrs ago</small>
                  </h5>
                  <p class="text-muted">
                    Sed ut perspiciatis unde omnis iste natus error sit
                  </p>

                  <a
                    href="javascript: void(0);"
                    class="text-muted font-13 d-inline-block"
                  >
                    <i class="mdi mdi-reply"></i> Reply
                  </a>
                </div>
              </div>
            </div>

            <div class="border rounded mt-4">
              <form action="#">
                <div class="px-2 py-1 bg-light">
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-sm btn-link text-dark text-decoration-none"
                    >
                      <i class="uil uil-link"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-link text-dark text-decoration-none"
                    >
                      <i class="uil uil-smile"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-link text-dark text-decoration-none"
                    >
                      <i class="uil uil-at"></i>
                    </button>
                  </div>
                </div>
                <textarea
                  rows="3"
                  class="form-control border-0 resize-none"
                  placeholder="Your Message..."
                ></textarea>
              </form>
            </div>
            <!-- end .border-->
          </div>
        </b-tab>
      </b-tabs>
      <!-- Nav tabs -->
      <!-- Tab content -->
    </div>
  </div>
</template>
