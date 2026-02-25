import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Navbar/Layout";
import Dashboard from "./Pages/Dashbaord";
import ProfilePage from "./Pages/ProfilePage";
import CancelSubscriptionPage from "./Pages/CancelSubscription";
import AccountLayout from "./Pages/AccountLayout";
import SubscriptionDetails from "./Component/SubscriptionPages/SubscriptionDetails";
import PurchesSubscription from "./Component/SubscriptionPages/PurchaseSubscription";
import PaymentHistory from "./Component/SubscriptionPages/PaymentHistory";
import PaymentInformation from "./Component/SubscriptionPages/PaymentInformation";
import CheckoutForm from "./Component/SubscriptionPages/CheckoutPage";
import ContentLibraryLayout from "./Pages/ContentLibraryLayout";
import ContentLibrary from "./Component/ContentLibrary/ContentLibrary";
import AddContentPage from "./Component/ContentLibrary/AddContent/AddContentPage";
import EditContentPage from "./Component/ContentLibrary/AddContent/UpdateContentData";
import PeopleLibrary from "./Component/PeopleLibrary/PeopleLibrary";
import ManageCategory from "./Component/ContentLibrary/ManageCategory";
import BulkUpload from "./Component/ContentLibrary/BulkUpload";

import AssetsLibraryLayout from "./Pages/AssetsLibraryLayout";
import VideoAssets from "./Component/Assets/VideoAssets";
import AudioAssets from "./Component/Assets/AudioAssets";
import ImageAssets from "./Component/Assets/ImageAssets";
import FileUploadPage from "./Component/Assets/FileUpload";
import FtpSyncPage from "./Component/Assets/BulkUpload";

import PlaylistLibraryLayout from "./Pages/PlayListLibraryLayout";
import AddPlaylist from "./Component/PlayListLibrary/AddNewPlayList";
import FeaturedSections from "./Component/FeaturedSection/FeaturedSections";
import ContentSettingLayout from "./Pages/ContentSettingLayout";

import NestedContent from "./Component/ContentSettings/NestedContent/NestedContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/account-info/cancel-subscription"
          element={<CancelSubscriptionPage />}
        />
        {/* ------------------------subscription--------------------------- */}
        <Route path="/billing" element={<AccountLayout />}>
          <Route
            index
            element={<Navigate to="subscription-details" replace />}
          />

          <Route
            path="subscription-details"
            element={<SubscriptionDetails />}
          />
          <Route
            path="purchase-subscription"
            element={<PurchesSubscription />}
          />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="payment-information" element={<PaymentInformation />} />
        </Route>
        {/* ------------------------subscription end--------------------------- */}

        {/* ------------------------Content libraty--------------------------- */}
        <Route path="/content" element={<ContentLibraryLayout />}>
          <Route index element={<Navigate to="content-library" replace />} />

          <Route path="content-library" element={<ContentLibrary />} />
          <Route
            path="content-library/add-content"
            element={<AddContentPage />}
          />
          <Route
            path="content-library/edit-content"
            element={<EditContentPage />}
          />
          <Route path="people-library" element={<PeopleLibrary />} />
          <Route path="manage-category" element={<ManageCategory />} />
          <Route path="bulk-upload" element={<BulkUpload />} />
        </Route>

        <Route path="/content/assets-library" element={<AssetsLibraryLayout />}>
          <Route index element={<Navigate to="video" replace />} />
          <Route path="video" element={<VideoAssets />} />
          <Route path="audio" element={<AudioAssets />} />
          <Route path="images" element={<ImageAssets />} />
          <Route path="file" element={<FileUploadPage />} />
          <Route path="bulk-uploads" element={<FtpSyncPage />} />
        </Route>
        <Route path="/content/playlists" element={<PlaylistLibraryLayout />} />

        <Route
          path="/content/playlists/add-playlist"
          element={<AddPlaylist />}
        />
        <Route
          path="/content/featured-section"
          element={<FeaturedSections />}
        />
        <Route
          path="/content/content-settings"
          element={<ContentSettingLayout />}
        >
          <Route index element={<Navigate to="nested-content" replace />} />

          <Route path="nested-content" element={<NestedContent />} />
        </Route>

        {/* ------------------------------contet libraty----------------------------------------- */}
      </Route>
      <Route path="/checkout" element={<CheckoutForm />} />
    </Routes>
  );
}

export default App;
