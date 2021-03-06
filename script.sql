USE [master]
GO
/****** Object:  Database [DoanhSo]    Script Date: 2/23/2021 11:56:48 AM ******/
CREATE DATABASE [DoanhSo]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'tbl_Doanh_so', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\tbl_Doanh_so.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'tbl_Doanh_so_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\tbl_Doanh_so_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DoanhSo] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DoanhSo].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DoanhSo] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DoanhSo] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DoanhSo] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DoanhSo] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DoanhSo] SET ARITHABORT OFF 
GO
ALTER DATABASE [DoanhSo] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DoanhSo] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DoanhSo] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DoanhSo] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DoanhSo] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DoanhSo] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DoanhSo] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DoanhSo] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DoanhSo] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DoanhSo] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DoanhSo] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DoanhSo] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DoanhSo] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DoanhSo] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DoanhSo] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DoanhSo] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DoanhSo] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DoanhSo] SET RECOVERY FULL 
GO
ALTER DATABASE [DoanhSo] SET  MULTI_USER 
GO
ALTER DATABASE [DoanhSo] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DoanhSo] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DoanhSo] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DoanhSo] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DoanhSo] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DoanhSo] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DoanhSo', N'ON'
GO
ALTER DATABASE [DoanhSo] SET QUERY_STORE = OFF
GO
USE [DoanhSo]
GO
/****** Object:  Table [dbo].[tbl_Doanh_so]    Script Date: 2/23/2021 11:56:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Doanh_so](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ngay_ct] [datetime] NULL,
	[ten_kh] [nvarchar](50) NULL,
	[doanh_so] [money] NULL,
 CONSTRAINT [PK_tbl_Doanh_so] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbl_Doanh_so] ON 

INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (2, CAST(N'2021-02-22T20:35:26.267' AS DateTime), N'Anh Nam Hà', 145621.6000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (3, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 2253342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (4, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (5, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (6, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (7, CAST(N'2021-03-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (8, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (9, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (10, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (11, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (12, CAST(N'2021-02-22T00:00:00.000' AS DateTime), N'Hà Anh Nam', 22342.0000)
INSERT [dbo].[tbl_Doanh_so] ([id], [ngay_ct], [ten_kh], [doanh_so]) VALUES (13, CAST(N'2021-02-23T10:51:20.330' AS DateTime), N'thắng trần', 451.6000)
SET IDENTITY_INSERT [dbo].[tbl_Doanh_so] OFF
GO
USE [master]
GO
ALTER DATABASE [DoanhSo] SET  READ_WRITE 
GO
