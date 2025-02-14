package dashboards

import (
	"time"

	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/user"
)

type SaveDashboardDTO struct {
	OrgId     int64
	UpdatedAt time.Time
	User      *user.SignedInUser
	Message   string
	Overwrite bool
	Dashboard *models.Dashboard
}

type DashboardSearchProjection struct {
	ID          int64  `xorm:"id"`
	UID         string `xorm:"uid"`
	Title       string
	Slug        string
	Term        string
	IsFolder    bool
	FolderID    int64  `xorm:"folder_id"`
	FolderUID   string `xorm:"folder_uid"`
	FolderSlug  string
	FolderTitle string
	SortMeta    int64
}

type CountDashboardsInFolderQuery struct {
	FolderUID string
}

// Note for reviewers: I wasn't sure what to name this. It's not actually a DTO
// CountDashboardsInFolderRequest is the request passed from the service to the
// store layer. The FolderID will be replaced with FolderUID when dashboards are
// updated with parent folder UIDs.
type CountDashboardsInFolderRequest struct {
	FolderID int64
	OrgID    int64
}
