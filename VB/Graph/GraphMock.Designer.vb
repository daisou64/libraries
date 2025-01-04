<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class GraphMock
    Inherits System.Windows.Forms.Form

    'フォームがコンポーネントの一覧をクリーンアップするために dispose をオーバーライドします。
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Windows フォーム デザイナーで必要です。
    Private components As System.ComponentModel.IContainer

    'メモ: 以下のプロシージャは Windows フォーム デザイナーで必要です。
    'Windows フォーム デザイナーを使用して変更できます。  
    'コード エディターを使って変更しないでください。
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        PlotView1 = New OxyPlot.WindowsForms.PlotView()
        Button1 = New Button()
        Label1 = New Label()
        Label2 = New Label()
        Label3 = New Label()
        Label_Max = New Label()
        Label_Min = New Label()
        Label_Scale = New Label()
        Label_iterator_current = New Label()
        Label_iterator_max = New Label()
        Label4 = New Label()
        SuspendLayout()
        ' 
        ' PlotView1
        ' 
        PlotView1.Location = New Point(12, 12)
        PlotView1.Name = "PlotView1"
        PlotView1.PanCursor = Cursors.Hand
        PlotView1.Size = New Size(776, 426)
        PlotView1.TabIndex = 0
        PlotView1.Text = "PlotView1"
        PlotView1.ZoomHorizontalCursor = Cursors.SizeWE
        PlotView1.ZoomRectangleCursor = Cursors.SizeNWSE
        PlotView1.ZoomVerticalCursor = Cursors.SizeNS
        ' 
        ' Button1
        ' 
        Button1.Location = New Point(666, 444)
        Button1.Name = "Button1"
        Button1.Size = New Size(122, 25)
        Button1.TabIndex = 1
        Button1.Text = "Next"
        Button1.UseVisualStyleBackColor = True
        ' 
        ' Label1
        ' 
        Label1.AutoSize = True
        Label1.Location = New Point(299, 449)
        Label1.Name = "Label1"
        Label1.Size = New Size(33, 15)
        Label1.TabIndex = 2
        Label1.Text = "Max:"
        ' 
        ' Label2
        ' 
        Label2.AutoSize = True
        Label2.Location = New Point(412, 449)
        Label2.Name = "Label2"
        Label2.Size = New Size(31, 15)
        Label2.TabIndex = 2
        Label2.Text = "Min:"
        ' 
        ' Label3
        ' 
        Label3.AutoSize = True
        Label3.Location = New Point(506, 449)
        Label3.Name = "Label3"
        Label3.Size = New Size(37, 15)
        Label3.TabIndex = 2
        Label3.Text = "Scale:"
        ' 
        ' Label_Max
        ' 
        Label_Max.AutoSize = True
        Label_Max.Location = New Point(345, 449)
        Label_Max.Name = "Label_Max"
        Label_Max.Size = New Size(30, 15)
        Label_Max.TabIndex = 2
        Label_Max.Text = "Max"
        ' 
        ' Label_Min
        ' 
        Label_Min.AutoSize = True
        Label_Min.Location = New Point(455, 449)
        Label_Min.Name = "Label_Min"
        Label_Min.Size = New Size(28, 15)
        Label_Min.TabIndex = 2
        Label_Min.Text = "Min"
        ' 
        ' Label_Scale
        ' 
        Label_Scale.AutoSize = True
        Label_Scale.Location = New Point(546, 449)
        Label_Scale.Name = "Label_Scale"
        Label_Scale.Size = New Size(34, 15)
        Label_Scale.TabIndex = 2
        Label_Scale.Text = "Scale"
        ' 
        ' Label_iterator_current
        ' 
        Label_iterator_current.AutoSize = True
        Label_iterator_current.Location = New Point(607, 449)
        Label_iterator_current.Name = "Label_iterator_current"
        Label_iterator_current.Size = New Size(13, 15)
        Label_iterator_current.TabIndex = 2
        Label_iterator_current.Text = "0"
        ' 
        ' Label_iterator_max
        ' 
        Label_iterator_max.AutoSize = True
        Label_iterator_max.Location = New Point(638, 449)
        Label_iterator_max.Name = "Label_iterator_max"
        Label_iterator_max.Size = New Size(13, 15)
        Label_iterator_max.TabIndex = 2
        Label_iterator_max.Text = "0"
        ' 
        ' Label4
        ' 
        Label4.AutoSize = True
        Label4.Location = New Point(626, 449)
        Label4.Name = "Label4"
        Label4.Size = New Size(12, 15)
        Label4.TabIndex = 2
        Label4.Text = "/"
        ' 
        ' GraphMock
        ' 
        AutoScaleDimensions = New SizeF(7F, 15F)
        AutoScaleMode = AutoScaleMode.Font
        ClientSize = New Size(800, 481)
        Controls.Add(Label_Scale)
        Controls.Add(Label4)
        Controls.Add(Label_iterator_max)
        Controls.Add(Label_iterator_current)
        Controls.Add(Label3)
        Controls.Add(Label_Min)
        Controls.Add(Label2)
        Controls.Add(Label_Max)
        Controls.Add(Label1)
        Controls.Add(Button1)
        Controls.Add(PlotView1)
        Name = "GraphMock"
        Text = "Graph"
        ResumeLayout(False)
        PerformLayout()
    End Sub

    Friend WithEvents PlotView1 As OxyPlot.WindowsForms.PlotView
    Friend WithEvents Button1 As Button
    Friend WithEvents Label1 As Label
    Friend WithEvents Label2 As Label
    Friend WithEvents Label3 As Label
    Friend WithEvents Label_Max As Label
    Friend WithEvents Label_Min As Label
    Friend WithEvents Label_Scale As Label
    Friend WithEvents Label_iterator_current As Label
    Friend WithEvents Label_iterator_max As Label
    Friend WithEvents Label4 As Label
End Class
